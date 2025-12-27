import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSources } from '../context/SourceContext'
import SourcesPanel from '../components/SourcesPanel'
import ChatPanel from '../components/ChatPanel'
import StudioPanel from '../components/StudioPanel'
import { useQuery } from '@tanstack/react-query'
import { S3fileUpload, S3urlReq } from '@/hooks/UploadDocsHook.js'
import {useMutation} from "@tanstack/react-query"

function Page1() {
   const { sources, addSource,removeSource } = useSources();
  const [activeTab, setActiveTab] = useState('sources')
  const [file,setFiles]=useState(null);
  const [uploadUrl,setUploadUrl]=useState(null);

 const mutation=useMutation({
  mutationFn:async({singleFile,url})=>{
    return await S3fileUpload(singleFile,url)
  }
 })
 const { data, isLoading, isError,isSuccess ,refetch} =useQuery({
  queryKey: ['FetchFile'],
  queryFn: S3urlReq,
  enabled: false
})


const UploadEvent = async (file) => {
  try {
    
    if (!file) {
      console.warn("No files to upload.");
      return;
    }
      const res = await refetch(); // get upload URL
      console.log('Presigned URL:', res.data?.url);
      const {url,key}=res?.data||{};
        const response=await mutation.mutateAsync({
          singleFile: file.file,
          url: res.data?.url,
        });
        if(response){
          console.log("File uploaded successfully:", response);
        }

    alert('Files  successfully');
    setFiles(null);
    mutation.reset();
   return true;
  } catch (error) {
    console.error("Error in file upload:", error);
  }
};



useEffect(()=>{
  console.log('FILLE CHAGE',file);
},[file])


  const panelVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <motion.div 
      className="h-screen bg-[#37383B] text-gray-200 flex flex-col justify-start md:flex-row pt-16 lg:pt-20"
      initial="hidden"
      animate="visible"
    >
      <div className="md:hidden flex border-b border-gray-700/50 bg-[#22262B] sticky top-16 z-40">
        <button
          onClick={() => setActiveTab('sources')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'sources'
              ? 'text-gray-100 border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Sources
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'chat'
              ? 'text-gray-100 border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab('studio')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'studio'
              ? 'text-gray-100 border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Studio
        </button>
      </div>

      <motion.div 
        className={`${
          activeTab === 'sources' ? 'flex' : 'hidden'
        } md:flex w-full md:w-[27%] border-r border-gray-700/50 flex-col overflow-hidden p-2 rounded-2xl h-full `}
        variants={panelVariants}
      >
        <SourcesPanel UploadEvent={UploadEvent} setFiles={setFiles} />
      </motion.div>

      <motion.div 
        className={`${
          activeTab === 'chat' ? 'flex' : 'hidden'
        } md:flex w-full md:w-[50%] border-r border-gray-700/50 flex-col overflow-hidden p-2 rounded-lg`}
        variants={panelVariants}
        transition={{ delay: 0.1 }}
      >
        <ChatPanel />
      </motion.div>

      <motion.div 
        className={`${
          activeTab === 'studio' ? 'flex' : 'hidden'
        } md:flex w-full md:w-[27%] flex-col overflow-hidden p-2 rounded-lg`}
        variants={panelVariants}
        transition={{ delay: 0.2 }}
      >
        <StudioPanel />
      </motion.div>
    </motion.div>
  )
}

export default Page1

