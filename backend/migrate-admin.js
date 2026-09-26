#!/usr/bin/env node
// Script to replace Convex usage with our API client in Admin.tsx

const fs = require('fs');
const path = require('path');

const adminFile = path.join(__dirname, '../src/pages/Admin.tsx');
let content = fs.readFileSync(adminFile, 'utf8');

// Remove Convex imports
content = content.replace(/import\s*\{[^}]*useMutation[^}]*\}\s*from\s*["']convex\/react["'];?\n?/g, '');
content = content.replace(/import\s*\{[^}]*useQueries[^}]*\}\s*from\s*["']convex\/react["'];?\n?/g, '');
content = content.replace(/import\s*\{\s*api\s*\}\s*from\s*["'][^"']*convex\/_generated\/api[^"']*["'];?\n?/g, '');

// Add API import at top after React imports
const importIndex = content.indexOf('import');
const firstImportEnd = content.indexOf('\n', importIndex);
const apiImport = 'import { api } from "@/lib/api";\n';
if (!content.includes('import { api } from "@/lib/api"')) {
  content = content.slice(0, firstImportEnd + 1) + apiImport + content.slice(firstImportEnd + 1);
}

// Replace useMutation calls with async functions
const mutations = [
  'checkPw',
  'updateProfile', 
  'addMedia',
  'removeMedia',
  'generateUploadUrl',
  'setAvatar',
  'setPassword'
];

mutations.forEach(name => {
  // Replace useMutation declaration
  const mutationRegex = new RegExp(`const\\s+${name}\\s*=\\s*useMutation\\([^)]+\\);`, 'g');
  content = content.replace(mutationRegex, `// ${name} handled via api client`);
});

// Replace useQueries with useState + useEffect
content = content.replace(
  /const queryMap = useMemo[^}]+\}\), \[\]\);/s,
  '// Data loading handled via useState + useEffect'
);

content = content.replace(
  /const results = useQueries\(queryMap\);/,
  '// See useEffect below for data loading'
);

// Add state and useEffect for data loading
const dataLoadingCode = `
  const [profile, setProfile] = useState<any>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loggedIn) return;
    async function loadData() {
      try {
        const [p, ph, v] = await Promise.all([
          api.getProfile(),
          api.listMediaByKind('photo'),
          api.listMediaByKind('video'),
        ]);
        setProfile(p);
        setPhotos(ph);
        setVideos(v);
      } catch (e) {
        console.error('Load error:', e);
      } finally {
        setDataLoading(false);
      }
    }
    loadData();
  }, [loggedIn]);
`;

// Find where to insert data loading (after loggedIn state)
const loggedInIndex = content.indexOf('const [loggedIn');
if (loggedInIndex > 0) {
  const nextLine = content.indexOf('\n', loggedInIndex);
  const insertPoint = content.indexOf('\n', nextLine) + 1;
  content = content.slice(0, insertPoint) + dataLoadingCode + content.slice(insertPoint);
}

// Replace mutation calls with API calls
content = content.replace(
  /await checkPw\(\{ password: pw \}\)/g,
  'await api.checkPassword(pw)'
);

content = content.replace(
  /await updateProfile\(\{ password: pw, ([^}]+) \}\)/g,
  'await api.updateProfile(pw, { $1 })'
);

content = content.replace(
  /await addMedia\(\{[^}]+\}\)/g,
  'await api.uploadMedia(pw, kind, file, title, url)'
);

content = content.replace(
  /await removeMedia\(\{ password: pw, id: ([^}]+) \}\)/g,
  'await api.removeMedia(pw, $1)'
);

content = content.replace(
  /await setAvatar\(\{ password: pw, storageId: ([^}]+) \}\)/g,
  'await api.uploadAvatar(pw, file)'
);

content = content.replace(
  /await setPassword\(\{ currentPassword: ([^,]+), newPassword: ([^}]+) \}\)/g,
  'await api.setPassword($1, $2)'
);

// Remove old data extraction lines
content = content.replace(
  /const profile = results\.profile[^;]+;/g,
  '// profile loaded via useEffect'
);
content = content.replace(
  /const photos = results\.photos[^;]+;/g,
  '// photos loaded via useEffect'
);
content = content.replace(
  /const videos = results\.videos[^;]+;/g,
  '// videos loaded via useEffect'
);

console.log('✅ Admin.tsx migration completed');
fs.writeFileSync(adminFile, content);
