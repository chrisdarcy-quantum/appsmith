import {
  agHelper,
  adminSettings,
} from "../../../../support/Objects/ObjectsCore";
import { CURRENT_REPO, REPO } from "../../../../fixtures/REPO";
import { featureFlagIntercept } from "../../../../support/Objects/FeatureFlags";
import AdminsSettings from "../../../../locators/AdminsSettings";

describe(
  "Admin Settings Page - General page validations",
  { tags: ["@tag.Settings"] },
  () => {
    it("1. TC# 2439 Verify 'Page title' changes upon changing Instance name", () => {
      adminSettings.NavigateToAdminSettings();
      agHelper.GetNClick(AdminsSettings.instanceSettingsTab);
      agHelper.WaitUntilEleAppear(adminSettings._instanceName);
      agHelper.ClearNType(adminSettings._instanceName, "Testing Instance name");
      agHelper.ClickOutside();
      agHelper.GetNClick(AdminsSettings.saveButton, 0, true);
      agHelper.ValidateToastMessage("Successfully saved");
      if (CURRENT_REPO === REPO.CE) cy.title().should("eq", "Appsmith");
      else if (CURRENT_REPO === REPO.EE)
        cy.title().should("eq", "Testing Instance name");
    });
  },
);
