import fs from 'node:fs'

if (fs.existsSync('dist'))
  fs.rmSync('dist', { recursive: true })

fs.mkdirSync('dist')

function copy(src, dist) {
  const files = fs.readdirSync(src)
  files.forEach((file) => {
    const srcFile = `${src}/${file}`
    const distFile = `${dist}/${file}`
    const stat = fs.statSync(srcFile)
    if (stat.isDirectory()) {
      if (file === 'test')
        return

      fs.mkdirSync(distFile)
      copy(srcFile, distFile)
    }
    else {
      if (file.endsWith('.spec.ts'))
        return

      fs.copyFileSync(srcFile, distFile)
    }
  })
}

copy('src', 'dist')

fs.copyFileSync('README.md', 'dist/README.md')
