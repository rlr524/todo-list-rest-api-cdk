#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TodoListRestApiCdkStack } from '../lib/todo-list-rest-api-cdk-stack';
import "dotenv/config";

const app = new cdk.App();
new TodoListRestApiCdkStack(app, 'TodoListRestApiCdkStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});