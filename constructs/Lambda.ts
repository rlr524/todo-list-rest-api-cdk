import { Construct } from "constructs";
import { Permission, Function, Runtime, Code } from "aws-cdk-lib/aws-lambda";
import {
	PolicyStatement,
	IManagedPolicy,
	PolicyDocument,
	ManagedPolicy,
	Role,
	ServicePrincipal,
} from "aws-cdk-lib/aws-iam";

export interface LambdaProps {
	policyStatements?: PolicyStatement[];
	managedPolicies?: IManagedPolicy[];
	handler: string;
	assetsPath: string;
	permissions?: Permission[];
	functionName: string;
	functionRoleDesc: string;
	functionRoleName: string;
	environment?: { [key: string]: string } | undefined;
}

export class Lambda extends Construct {
	constructor(scope: Construct, id: string, props: LambdaProps) {
		super(scope, id);

		const inlinePolicyDoc = new PolicyDocument();
		if (props.policyStatements && props.policyStatements.length > 0) {
			props.policyStatements.forEach((policyStatement) => {
				inlinePolicyDoc.addStatements(policyStatement);
			});
		}

		if (props.managedPolicies && props.managedPolicies.length > 0) {
			props.managedPolicies.push(
				ManagedPolicy.fromAwsManagedPolicyName(
					"service-role/AWSLambdaBasicExecutionRole"
				)
			);
		} else {
			props.managedPolicies = [
				ManagedPolicy.fromAwsManagedPolicyName(
					"service-role/AWSLambdaBasicExecutionRole"
				),
			];
		}

		const execRole = new Role(this, props.functionRoleName, {
			assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
			description: props.functionRoleDesc,
			managedPolicies: props.managedPolicies,
			inlinePolicies:
				props.policyStatements && props.policyStatements.length > 0
					? {
							INLINE_POLICY: inlinePolicyDoc,
					  }
					: undefined,
			roleName: props.functionRoleName,
		});

		const l = new Function(this, props.functionName, {
			runtime: Runtime.NODEJS_22_X,
			code: Code.fromAsset(props.assetsPath),
			handler: props.handler,
			role: execRole,
			functionName: props.functionName,
			environment: props.environment,
		});

		if (props.permissions && props.permissions.length > 0) {
			let index = 1;
			props.permissions.forEach((permission) => {
				l.addPermission("lambda_permission_" + index, permission);
				index++;
			});
		}
	}
}
