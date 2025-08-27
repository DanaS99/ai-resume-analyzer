import Navbar from '~/components/Navbar';
import type { Route } from './+types/home';
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import ResumeCard from '~/components/ResumeCard';
import { usePuterStore } from '~/lib/puter';
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'AI Resume Analyzer' },
    { name: 'description', content: 'Smart feedback for your job' },
  ];
}

export default function Home() {

  const { auth } = usePuterStore();  
  const navigate = useNavigate();

  useEffect(() => {
    if(!auth.isAuthenticated)
        navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  const [resumes, setResumes] = useState<Resume[]>([]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className='main-section'>
        <div className='page-heading py-16'>
          <h1>Track your Applications & Resume Ratings</h1>
          <p>Review your submitions and get instant feedback</p>
        </div>

        {resumes.length > 0 && (
          <div className='resumes-section'>
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
