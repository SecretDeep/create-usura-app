#!/usr/bin/env node
import { execSync, spawn } from "node:child_process"
import { existsSync, rmSync } from "node:fs"
import { resolve } from "node:path"

const TEMPLATE_REPO = "SecretDeep/usura-template"

const projectName = process.argv[2]

if (!projectName) {
  console.error("Usage: bunx create-usura-app <project-name>")
  process.exit(1)
}

const targetDir = resolve(process.cwd(), projectName)

if (existsSync(targetDir)) {
  console.error(`Error: Directory "${projectName}" already exists`)
  process.exit(1)
}

console.log(`\n📦 Creating ${projectName}...\n`)

try {
  execSync(
    `git clone --depth 1 git@github.com:${TEMPLATE_REPO}.git ${projectName}`,
    {
      stdio: "inherit",
    }
  )

  rmSync(resolve(targetDir, ".git"), { recursive: true, force: true })
  rmSync(resolve(targetDir, "node_modules"), { recursive: true, force: true })

  execSync("git init", { cwd: targetDir, stdio: "ignore" })

  console.log("")
  const setup = spawn("bun", ["scripts/setup.ts"], {
    cwd: targetDir,
    stdio: "inherit",
  })

  setup.on("close", (code) => {
    if (code === 0) {
      execSync("git add -A", { cwd: targetDir, stdio: "ignore" })
      execSync('git commit --no-verify -m "Initial commit"', {
        cwd: targetDir,
        stdio: "ignore",
      })
      console.log("\n🎉 Done! Next steps:\n")
      console.log(`   cd ${projectName}`)
      console.log(`   bun alchemy configure --profile ${projectName}`)
      console.log("   Add ANTHROPIC_API_KEY to .env (https://console.anthropic.com/settings/keys)")
      console.log("   code . && reopen in Dev Container")
      console.log("   bun run dev\n")
    }
    process.exit(code ?? 0)
  })
} catch (err) {
  console.error("Failed to create project:", err.message)
  process.exit(1)
}
