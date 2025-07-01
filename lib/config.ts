export class Config {
	private account: string | undefined;
	private region: string | undefined;

	private appFuncRoleName: string;
	private appFuncRoleDesc: string;
	private appFuncName: string;

	private defaults = {
		appFuncRoleName: "app-role",
		appFuncRoleDesc: "Role for app Function",
		appFuncName: "app",
	};

	constructor() {
		this.account =
			process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT;
		this.region =
			process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION;

		this.appFuncRoleName =
			process.env.APP_FUNC_ROLE_NAME ||
			this.defaults.appFuncRoleName;
		this.appFuncRoleDesc =
			process.env.APP_FUNC_ROLE_DESC ||
			this.defaults.appFuncRoleDesc;
		this.appFuncName =
			process.env.APP_FUNC_NAME || this.defaults.appFuncName;
	}

	getAccount(): string | undefined {
		return this.account;
	}
	getRegion(): string | undefined {
		return this.region;
	}

	getappFuncRoleName(): string {
		return this.getValWithEnv(this.appFuncRoleName);
	}
	getappFuncRoleDesc(): string {
		return this.appFuncRoleDesc;
	}
	getappFuncName(): string {
		return this.getValWithEnv(this.appFuncName);
	}

	private getValWithEnv(val: string): string {
		return val + "-" + process.env.ENVIRONMENT;
	}
}
