export const Certificate: React.FC = () => {
  return (
    <div className='bg-secondary relative h-auto w-full p-4 md:px-10 pb-20 shadow-xl'>
      <h4 className='relative text-3xl text-text mb-4'>
        Certificates
        <div className="border-b-[3px] border-accent w-[80px]"></div>
      </h4>
      <p className="text-text md:w-[50%] w-full mb-8">
        Most of the skills I gained were <span className="text-accent">self-taught.</span> However, I also acquired some certifications through testing and competitions.
      </p>

      <div className="flex gap-3 flex-col md:flex-row">
        <div className="w-[100%] md:w-[75%]">
          <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            <img src="/assets/static/img/Portfolio/sql-advanced.webp" className="w-full h-full object-fill shadow-xl" alt="SQL Advanced Certification"/>
            <img src="/assets/static/img/Portfolio/javascript-intermediate.webp" className="w-full h-full object-fill shadow-xl" alt="JavaScript Intermediate Certification"/>
            <img src="/assets/static/img/Portfolio/webdev.webp" className="w-full h-full object-fill shadow-xl" alt="Web Development Certification"/>
            <img src="/assets/static/img/Portfolio/data-programing.webp" className="w-full h-full object-fill shadow-xl" alt="SQL Advanced Certification"/>
            <img src="/assets/static/img/Portfolio/tech.webp" className="w-full h-full object-fill shadow-xl" alt="Tech for Everyone Certification"/>
            <img src="/assets/static/img/Portfolio/lks.webp" className="w-full h-full object-fill shadow-xl" alt="LKS Jateng Certification"/>
          </div>
        </div>
        <div className="w-[calc(50%-8px)] md:w-[25%]">
          <img src="/assets/static/img/Portfolio/toeic.webp" className="w-full h-full object-fill shadow-xl" alt="Advanced TOEIC Certification"/>
        </div>
      </div>
    </div>
  );
};
