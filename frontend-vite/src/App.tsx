import { ThemeProvider } from "./components/themeprovider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screens/login";
import StudentsTable from "./screens/students-table";
import NotFound from "./screens/not-found";
import CertificateForm from "./screens/certificate-form";
import CertificateImport from "./screens/certificate-import";
import Export from "./screens/export";
import Profile from "./screens/profile";
import Settings from "./screens/settings";
import TitleForm from "./screens/title-form";
import TitleImport from "./screens/title-import";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/students-table" element={<StudentsTable />} />
          <Route path="/certificate-form" element={<CertificateForm />} />
          <Route path="/certificate-import" element={<CertificateImport />} />
          <Route path="/export" element={<Export />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/title-form" element={<TitleForm />} />
          <Route path="/title-import" element={<TitleImport />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
