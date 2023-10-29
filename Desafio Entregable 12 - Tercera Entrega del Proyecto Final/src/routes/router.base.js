import { Router } from "express";

export default class RouterBase {
  constructor() {
    this.router = Router()
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() { }

  get(path, policies, ...callbacks) {
    this.router.get(path, this.customResponses, this.handlePolicies(policies), this.apply(callbacks));
  }

  post(path, policies, ...callbacks) {
    this.router.post(path, this.customResponses, this.handlePolicies(policies), this.apply(callbacks));
  }
  put(path, policies, ...callbacks) {
    this.router.put(path, this.customResponses, this.handlePolicies(policies), this.apply(callbacks));
  }

  delete(path, policies, ...callbacks) {
    this.router.delete(path, this.customResponses, this.handlePolicies(policies), this.apply(callbacks));
  }

  apply(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        console.log(error);
        params[1].status(500).send(error);
      }
    });
  }

  customResponses(req, res, next) {
    //200
    res.sendSuccess = obj => res.status(200).send({ status: 'success', ...obj });
    res.sendCreated = obj => res.status(201).send({ status: 'success', ...obj });
    //400
    res.sendBadRequest = obj => res.status(400).send({ status: 'error', ...obj });
    res.sendUnauthorized = () => res.status(401).send({ status: 'unauthorized' });
    res.sendForbiden = () => res.status(403).send({ status: 'error' });
    res.sendNotFound = obj => res.status(404).send({ status: 'error', ...obj });
    //500
    res.sendServerError = () => res.status(500).send({ status: 'error', msg: "Server error, try later" });
    next();
  }

  handlePolicies(policies) {
    return async (req, res, next) => {
      const role = req.user?.role ?? "PUBLIC"

      if (policies.length === 1 && policies[0] == "*") return next()
      if (policies.length === 1 && policies[0] == "AUTHENTICATED" && ['USER', 'ADMIN'].includes(role)) return next()
      if (!policies.includes(role)) return res.sendUnauthorized()
      next()
    }
  }
}