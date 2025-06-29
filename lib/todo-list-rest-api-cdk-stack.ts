import * as cdk from "aws-cdk-lib";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

class L3Bucket extends Construct {
	constructor(scope: Construct, id: string, expiration: number) {
		super(scope, id);

		new Bucket(this, "L3Bucket", {
			lifecycleRules: [
				{
					expiration: cdk.Duration.days(expiration),
				},
			],
		});
	}
}

export class TodoListRestApiCdkStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// Create an S3 bucket 3 ways
		new CfnBucket(this, "L1Bucket", {
			lifecycleConfiguration: {
				rules: [
					{
						expirationInDays: 1,
						status: "Enabled",
					},
				],
			},
		});

		const duration = new cdk.CfnParameter(this, "duration", {
			default: 6,
			minValue: 1,
			maxValue: 10,
			type: "Number",
		});

		const L2Bucket = new Bucket(this, "L2Bucket", {
			lifecycleRules: [
				{
					expiration: cdk.Duration.days(duration.valueAsNumber),
				},
			],
		});

		new cdk.CfnOutput(this, "L2BucketName", {
			value: L2Bucket.bucketName,
		});

		new L3Bucket(this, "L3Bucket", 3);
	}
}
