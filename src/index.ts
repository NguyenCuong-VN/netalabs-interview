import { program } from "commander";
import { Config, Worker } from "@aptos-labs/aptos-processor-sdk";
import { EventProcessor } from "./processor";
import { Event, ThalaData } from "./models";
import { IThalaData } from "./types";
import { buckInsert, initDatabase } from "./database.helper";
import "reflect-metadata";

type Args = {
  config: string;
  perf: number;
};

// For APTOS
program
  .command("process")
  .requiredOption("--config <config>", "Path to a yaml config file")
  .action(async (args: Args) => {
    await main(args);
  });

async function main({ config: configPath }: Args) {
  const config = Config.from_yaml_file(configPath);
  const processor = new EventProcessor();
  const worker = new Worker({
    config,
    processor,
    models: [Event],
  });
  await worker.run();
}

// For Thala crawler
program
  .command("crawler")
  .requiredOption("--source <config>", "From Thala or Liquidswap")
  .action(async (args: { source: string }) => {
    switch (args.source) {
      // crawl thala resource handler
      case "thala":
        // get data
        const response = await fetch(
          "https://app.thala.fi/api/liquidity-pools",
        );

        if (response.status !== 200) {
          console.error(
            "Something went wrong with Thala server: ",
            response.statusText,
          );
          return;
        }

        const data: IThalaData = await response.json();
        if (!data.data) return;

        // validate data
        const validData: Array<ThalaData> = [];
        data.data.map((item) => {
          if (item.tvl <= 100000) return;

          const thalaItem = new ThalaData();
          thalaItem.poolType = item.poolType;
          thalaItem.apr = JSON.stringify(item.apr); // can improve by save as array type of dbsql supportive
          thalaItem.tvl = item.tvl;
          thalaItem.volume1d = item.volume1d;

          validData.push(thalaItem);
        });

        // save to DB
        await initDatabase();
        await buckInsert(validData, ThalaData);
        return;

      // default return
      default:
        break;
    }
  });

program.parse();
