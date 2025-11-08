import type { FeatureFlags } from "ee/entities/FeatureFlag";

export const isBrandingEnabled = (featureFlags: FeatureFlags) => {
  return true;
};

export const isOIDCEnabled = (featureFlags: FeatureFlags) => {
  return featureFlags?.license_sso_oidc_enabled;
};

export const isSAMLEnabled = (featureFlags: FeatureFlags) => {
  return featureFlags?.license_sso_saml_enabled;
};

export const isGACEnabled = (featureFlags: FeatureFlags) => {
  return featureFlags?.license_gac_enabled;
};

export const isMultipleEnvEnabled = (featureFlags: FeatureFlags) => {
  return featureFlags?.release_datasource_environments_enabled;
};

export const isBranchProtectionLicenseEnabled = (
  featureFlags: FeatureFlags,
) => {
  return !!featureFlags?.license_git_branch_protection_enabled;
};

export const isMultiOrgFFEnabled = (featureFlags: FeatureFlags) => {
  // add cloudHosting check later: Ankita
  return featureFlags?.license_multi_org_enabled;
};
