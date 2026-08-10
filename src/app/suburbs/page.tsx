import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SuburbFinder from '@/components/SuburbFinder';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Canberra Service Areas & Suburbs Directory | Carpet Cleaning Deals",
  description: "Complete list of Canberra ACT districts and suburbs serviced. Belconnen, Gungahlin, Tuggeranong, Woden, Weston Creek, Molonglo, Inner North/South & Queanbeyan."
};

export default function SuburbsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#f0f9ff] text-slate-900">
      <Header />
      <div className="py-8">
        <SuburbFinder />
      </div>
      <Footer />
    </main>
  );
}
