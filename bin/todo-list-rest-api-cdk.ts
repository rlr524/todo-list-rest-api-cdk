#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { TodoListRestApiCdkStack } from "../lib/todo-list-rest-api-cdk-stack";
import "dotenv/config";

const app = new cdk.App();
new TodoListRestApiCdkStack(app, "TodoListRestApiCdkStack", {});
