import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { FaFileInvoiceDollar } from "react-icons/fa6"
import { FaSearch, FaArrowLeft, FaArrowRight  } from "react-icons/fa";
import { IoFastFoodOutline, IoConstructOutline, IoBedOutline, IoEllipsisHorizontalCircleOutline, IoCarSportOutline } from "react-icons/io5";

import { api, urlIploads } from '../services/api';
import Header from '../components/Header';
import { RefundItem, type RefundItemProps } from '../components/RefundItem';

const PER_PAGE = 5

const CATEGORY_ICONS = {
  Alimentação: IoFastFoodOutline,
  Outros: IoEllipsisHorizontalCircleOutline,
  services: IoConstructOutline,
  Transporte: IoCarSportOutline,
  Hospedagem: IoBedOutline,
}


interface RefundAPI {
  id: string,
  name: string,
  category: string,
  amount: number,
  filename: string,
  user: {
    name: string,
  }
}

export default function Dashboard() {
  const [name, setName] = useState("")
  const [page, setPage] = useState(1)
  const [totalOfPage, setTotalOfPage] = useState(0)
  const [totalItens, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(false);
  const [refunds, setRefunds] = useState<(RefundItemProps & {fileUrl: String})[]>([]);

 
  
  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-300">
      <Header />
      
      <div className="flex-1 flex justify-center items-start p-6">
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-md overflow-hidden mt-4">
          <div className="bg-sky-600 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3 text-white">
              <FaFileInvoiceDollar className="text-2xl" />
              <h1 className="text-xl font-bold">Solicitações de Reembolso</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sky-100 text-sm hidden sm:block">
                Total: {totalItens}
              </span>
            </div>
          </div>


          {/* Pesquisa */}
          <form
            className="flex flex-1 mx-10 items-center justify-center pb-6 md:flex-row gap-2 mt-6"
        >
              <input 
                  className=' flex-1 h-12 rounded-lg border border-gray-300 px-4 text-sm  bg-transparent outline-none focus:border-2 focus:border-sky-600 placeholder-gray-300'
                  placeholder="Pesquisar pelo nome do funcionário ou descrição..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              />

              <button type="submit" className='border border-gray-300 p-2 rounded-lg bg-sky-600 cursor-pointer'>
                  <FaSearch className="text-3xl text-white"/>
              </button>
          </form>

          {/* Lista com os envios */}
          <div className='p-10 flex flex-col gap-4 max-h-[342px] overflow-y-scroll'>
            {isLoading ? <p className="text-center text-gray-500">Carregando...</p> : (
                <>
                    {refunds.map((item) => (
                      <RefundItem 
                        key={item.id} 
                        data={item} 
                        href={`/refund/${item.fileUrl}`} 
                        target="_blank"     
                        rel="noopener noreferrer" 
                        title="Clique para ver o comprovante"
                      /> 
                    ))}

                    {refunds.length === 0 && (
                        <p className="text-center text-gray-400">Nenhum envio encontrado.</p>
                    )}
                </>
            )}
          </div>


          {/* Paginação */}
          <div className="p-4 flex justify-center items-center gap-2">
            <button
              disabled= {page === 1}
              onClick={() => setPage(page -1)}
              className='border border-gray-300 p-2 rounded-lg bg-sky-600 cursor-pointer'
            >
              <FaArrowLeft className='text-2xl text-white' />
            </button>

            <span className="px-3 py-1 text-sm text-gray-600">
              Página {page} de {totalOfPage > 0 ? totalOfPage : 1}
            </span>

            <button
              disabled= {page === 1}
              onClick={() => setPage(page -1)}
              className='border border-gray-300 p-2 rounded-lg bg-sky-600 cursor-pointer'
            >
              <FaArrowRight className='text-2xl text-white' />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}