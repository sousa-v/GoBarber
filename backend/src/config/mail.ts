interface IMailConfig {
  driver: "ethereal" | "s";

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || "ethereal",

  defaults: {
    from: {
      email: "victor@teste.com.br",
      name: "Victor",
    },
  },
} as IMailConfig;
