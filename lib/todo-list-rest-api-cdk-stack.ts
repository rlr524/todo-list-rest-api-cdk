import * as cdk from "aws-cdk-lib";
import { Lambda, LambdaProps } from "../constructs/Lambda"
import { Construct } from "constructs";
import { Config } from "./config";

export class TodoListRestApiCdkStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		if (process.env.ENVIRONMENT) {
			super(scope, id, props);

			const config = new Config();

			this.addAppFunction(config);

			cdk.Tags.of(this).add("APP_NAME", "TODO-LIST-REST-API")
			cdk.Tags.of(this).add("ENVIRONMENT", process.env.ENVIRONMENT);
		} else {
			throw new Error("ENVIRONMENT env variable is mandatory")
		}
	}

	private addAppFunction(config: Config) {
		const lambdaProps: LambdaProps = {
			handler: "index.handler",
			assetsPath: "src/lib",
			functionName: config.getappFuncName(),
			functionRoleDesc: config.getappFuncRoleDesc(),
			functionRoleName: config.getappFuncRoleName(),
		};

		new Lambda(this, config.getappFuncName(), lambdaProps);
	}
}
