import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import footerData from './data/footerData.json'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ScrollToTop from './components/common/ScrollToTop'

// Every non-landing route is code-split: its JS and JSON data only download
// when the user actually navigates there.
const solutionsRoute = (dataImport) =>
  lazy(() =>
    Promise.all([import('./pages/Solutions'), dataImport()]).then(([mod, data]) => {
      const Page = mod.default
      return { default: () => <Page solutionData={data.default} /> }
    })
  )

const SolutionsRfq = solutionsRoute(() => import('./data/solutions-one.json'))
const SolutionsQuote = solutionsRoute(() => import('./data/solutions-two.json'))
const SolutionsContract = solutionsRoute(() => import('./data/RequestForQuote.json'))
const SolutionsBudgets = solutionsRoute(() => import('./data/Budgets.json'))
const SolutionsSchedule = solutionsRoute(() => import('./data/Schedule.json'))

const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })))
const Blogs = lazy(() => import('./pages/Blogs'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const WhoWeServe = lazy(() => import('./components/home/WhoWeServe'))
const Services = lazy(() => import('./pages/Services'))
const General = lazy(() => import('./pages/General'))
const ResidentialBuilders = lazy(() => import('./pages/ResidentialBuilders'))
const Remodelers = lazy(() => import('./pages/Remodelers'))
const SpecialtyContractors = lazy(() => import('./pages/SpecialtyContractors'))
const Developer = lazy(() => import('./pages/Developers'))
const FinancialManagement = lazy(() => import('./pages/financialmana'))
const ConstructionManagement = lazy(() => import('./pages/ConstructionManagement'))
const CRMManagement = lazy(() => import('./pages/CRMManagement'))
const RealtyManagement = lazy(() => import('./pages/RealtyManagement'))
const ResourceManagement = lazy(() => import('./pages/ResourceManagement'))
const Contact = lazy(() => import('./pages/Contact'))
const ThankYou = lazy(() => import('./pages/ThankYou'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

const App = () => {
  return (
    <div className=''>
      <ScrollToTop />
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Routes>
            <Route path='/about' element={<About />} />
            <Route path='/' element={<Home />} />
            <Route path='/solutions/rfq' element={<SolutionsRfq />} />
            <Route path='/solutions/quote' element={<SolutionsQuote />} />
            <Route path='/solutions/contract' element={<SolutionsContract />} />
            <Route path='/solutions/budgets' element={<SolutionsBudgets />} />
            <Route path='/solutions/schedule' element={<SolutionsSchedule />} />
            <Route path='/services/finance' element={<FinancialManagement />} />
            <Route path='/services/construction' element={<ConstructionManagement />} />
            <Route path='/services/crm-management' element={<CRMManagement />} />
            <Route path='/services/realty-management' element={<RealtyManagement />} />
            <Route path='/services/resource-management' element={<ResourceManagement />} />
            <Route path='/who-we-serve' element={<WhoWeServe />} />
            <Route path='/serve/general-contractors' element={<General />} />
            <Route path='/serve/residential-builders' element={<ResidentialBuilders />} />
            <Route path='/serve/remodelers' element={<Remodelers />} />
            <Route path='/serve/specialty-contractors' element={<SpecialtyContractors />} />
            <Route path='/serve/developers' element={<Developer />} />
            <Route path='/services' element={<Services />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/blog/:slug' element={<BlogPost />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/thank-you' element={<ThankYou />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer data={footerData} />

    </div>
  )
}

export default App
