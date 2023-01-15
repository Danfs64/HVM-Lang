import chalk from 'chalk';
import { Command } from 'commander';
import { File } from '../language-server/generated/ast';
import { HvmLanguageMetaData } from '../language-server/generated/module';
import { createHvmServices } from '../language-server/hvm-module';
import { extractAstNode } from './cli-util';
// import { generateJavaScript } from './generator';
import { NodeFileSystem } from 'langium/node';

export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
    const services = createHvmServices(NodeFileSystem).Hvm;
    const model = await extractAstNode<File>(fileName, services);
    // const generatedFilePath = generateJavaScript(model, fileName, opts.destination);
    console.log(chalk.green(`Grammar extracted successfully: ${model.$document?.parseResult}`));
};

export type GenerateOptions = {
    destination?: string;
}

export default function(): void {
    const program = new Command();

    program
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .version(require('../../package.json').version);

    const fileExtensions = HvmLanguageMetaData.fileExtensions.join(', ');
    program
        .command('generate')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .option('-d, --destination <dir>', 'destination directory of generating')
        .description('generates JavaScript code that prints "Hello, {name}!" for each greeting in a source file')
        .action(generateAction);

    program.parse(process.argv);
}
