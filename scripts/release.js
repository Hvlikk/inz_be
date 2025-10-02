const { execSync } = require("child_process");
const fs = require("fs");

const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
const version = pkg.version;

function updateChangelog() {
  const changelog = fs.readFileSync("CHANGELOG.md", "utf-8");
  const versionHeader = `### [${version}]`;

  if (changelog.includes(versionHeader)) {
    const lines = changelog.split('\n');
    const headerIndex = lines.findIndex(line => line.includes(versionHeader));

    if (headerIndex !== -1) {
      const nextLine = lines[headerIndex + 2] || '';

      if (nextLine.trim() === '' || nextLine.startsWith('###') || nextLine.startsWith('##')) {
        lines.splice(headerIndex + 2, 0, '* **version bump only**', '');
        fs.writeFileSync("CHANGELOG.md", lines.join('\n'));
      }
    }
  }
}


const branch = `chore/release/app-${version}`;
try {
  try {
    execSync("git diff --quiet || git stash", { stdio: "inherit" });
  } catch (e) {
  }

  execSync("git checkout main && git pull --rebase origin main", { stdio: "inherit" });

  execSync("git fetch --tags", { stdio: "inherit" });

  try {
    execSync("git stash pop || echo 'No stash to pop'", { stdio: "inherit" });
  } catch (e) {
  }

  updateChangelog();

  execSync(`git checkout -b ${branch}`, { stdio: "inherit" });
  execSync("git add package.json package-lock.json CHANGELOG.md", { stdio: "inherit" });
  execSync(`git commit -m "chore(release): app@${version}"`, { stdio: "inherit" });
  execSync(`git tag -a v${version} -m "Release app@${version}"`, { stdio: "inherit" });
  execSync(`git push -u origin ${branch}`, { stdio: "inherit" });
  execSync(`git push origin v${version}`, { stdio: "inherit" });
  execSync(
    `gh pr create --title "chore(release): app@${version}" --body "release cut" --base main --head ${branch}`,
    { stdio: "inherit" }
  );

  console.log(`PR created for release: app@${version}`);
} catch (e) {
  console.error("Error during PR creation:", e.message);
  process.exit(1);
}
