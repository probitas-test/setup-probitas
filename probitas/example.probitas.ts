import { scenario } from "@probitas-test/probitas";

export default scenario("Example Scenario", { tags: ["example", "basic"] })
  .step("Step 1: Initialize", () => {
    console.log("Starting example scenario...");
    return { initialized: true };
  })
  .step("Step 2: Process", (ctx) => {
    if (!ctx.previous.initialized) {
      throw new Error("Not initialized!");
    }
    console.log("Processing data...");
    return { data: [1, 2, 3, 4, 5] };
  })
  .step("Step 3: Verify", (ctx) => {
    const sum = ctx.previous.data.reduce((a, b) => a + b, 0);
    console.log(`Sum of data: ${sum}`);
    if (sum !== 15) {
      throw new Error(`Expected sum to be 15, got ${sum}`);
    }
    return { sum };
  })
  .build();
