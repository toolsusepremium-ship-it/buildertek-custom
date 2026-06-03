import { Route, Routes } from 'react-router-dom'
import footerData from './data/footerData.json'
import solutionDataOne from './data/solutions-one.json'
import solutionDataTwo from './data/solutions-two.json'
import Solutions from './pages/Solutions'
import RequestForQuote from './data/RequestForQuote.json'
import Budgets from './data/Budgets.json'
import Schedule from './data/Schedule.json'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Blogs from './pages/Blogs'
import ScrollToTop from './components/common/ScrollToTop'
import WhoWeServe from './components/home/WhoWeServe'
import Services from './pages/Services'
import General from './pages/General'
import ResidentialBuilders from './pages/ResidentialBuilders'
import Remodelers from './pages/Remodelers'
import SpecialtyContractors from './pages/SpecialtyContractors'
import Developer from './pages/Developers'
import FinancialManagement from './pages/financialmana'
import ConstructionManagement from './pages/ConstructionManagement'
import CRMManagement from './pages/CRMManagement'
import RealtyManagement from './pages/RealtyManagement'
import ResourceManagement from './pages/ResourceManagement'
import { About } from './pages/About'
import Contact from './pages/Contact'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound.jsx'
import FreeDemo from './pages/FreeDemo'
import ThankYou from './pages/ThankYou'


const App = () => {
  return (
    <div className=''>
      <ScrollToTop />
      <Navbar />
      <div className="">
        {/* w-[85%] mx-auto */}
        <Routes>
          {/* <Route path='/' element={<Solutions solutionData={solutionDataOne} />} /> */}
          <Route path='/about' element={<About />} />
          <Route path='/' element={<Home />} />
          <Route path='/solutions/rfq' element={<Solutions solutionData={solutionDataOne} />} />
          <Route path='/solutions/quote' element={<Solutions solutionData={solutionDataTwo} />} />
          <Route path='/solutions/contract' element={<Solutions solutionData={RequestForQuote} />} />
          <Route path='/solutions/budgets' element={<Solutions solutionData={Budgets} />} />
          <Route path='/solutions/schedule' element={<Solutions solutionData={Schedule} />} />
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
          <Route path='/free-demo' element={<FreeDemo />} />
          <Route path='/thank-you' element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {/* <Footer /> */}
      <Footer data={footerData} />

    </div>
  )
}

export default App