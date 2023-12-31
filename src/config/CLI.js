import { Command } from "commander";

const useCLI = () => {
  const program = new Command();

  program.name("CLI App").description("A CLI for starting up the app");
  program.requiredOption("-m, --mode [mode]", "Mode of the app", "prod");
  program.parse();

  return program.opts();
};

const { mode } = useCLI();

export default mode;
