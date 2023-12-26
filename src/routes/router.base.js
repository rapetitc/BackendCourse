import { Router } from "express";

export default class RouterBase {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}

  get(path, policies, ...callbacks) {
    this.router.get(path, this.handlePolicies(policies), this.apply(callbacks));
  }

  post(path, policies, ...callbacks) {
    this.router.post(path, this.handlePolicies(policies), this.apply(callbacks));
  }

  put(path, policies, ...callbacks) {
    this.router.put(path, this.handlePolicies(policies), this.apply(callbacks));
  }

  delete(path, policies, ...callbacks) {
    this.router.delete(path, this.handlePolicies(policies), this.apply(callbacks));
  }

  apply(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        params[1].status(500).send(error);
      }
    });
  }

  handlePolicies(policies) {
    return async (req, res, next) => {
      const role = req.user?.role ?? "PUBLIC";

      if (policies.length === 1 && policies[0] == "*") return next();
      if (policies.length === 1 && policies[0] == "AUTHENTICATED" && ["USER", "PREMIUM", "ADMIN"].includes(role)) return next();
      if (!policies.includes(role)) return res.sendUnauthorized();
      next();
    };
  }
}
