// src/ability.js

import { AbilityBuilder, Ability } from "@casl/ability";

export const ability = new Ability();

export const buildAbility = (user) => {
  const { can, rules } = AbilityBuilder.extract();

  if (user.isAdmin) {
    can("manage", "all");
  } else if (user.isManager) {
    can("read", "Dashboard");
  } else {
    can("read", "Dashboard", { createdBy: user.id });
  }

  ability.update(rules);
};
