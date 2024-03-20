import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { ArrowLeftToLine, ArrowRightToLine, ChevronLeft, ChevronRight } from 'lucide-react';

export type PaginationData = {
  total_count: number,
  current_page: string,
  page_size: number,
  total_pages: number,
  next: string,
  previous: string,
  first: string,
  last: string
}

interface PaginationHandlerProps{
  data: PaginationData,
  setData: React.Dispatch<React.SetStateAction<PaginationData>>
}

const PaginationHandler = ({data, setData}: PaginationHandlerProps) => {
  const {current_page, page_size, total_pages, next, previous} = data
  return (
    <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="hidden md:flex items-center space-x-2">
          <p className="text-sm font-medium">Filas por página</p>
          <Select
            value={`${page_size}`}
            onValueChange={(value) => {
              setData({...data, page_size: Number(value), current_page: "1"})
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={`${page_size}`} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[110px] items-center justify-center text-sm font-medium">
          Página {current_page === "last"? `${total_pages}`: current_page} de {`${total_pages}`}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setData({...data, current_page: "1"})}
            disabled={!previous}
          >
            <span className="sr-only">Primera página</span>
            <ArrowLeftToLine className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setData({...data, current_page: `${Number(current_page) - 1}`})}
            disabled={!previous}
          >
            <span className="sr-only">Anterior</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setData({...data, current_page: `${Number(current_page) + 1}`})}
            disabled={!next}
          >
            <span className="sr-only">Siguiente</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setData({...data, current_page: "last"})}
            disabled={!next}
          >
            <span className="sr-only">Última página</span>
            <ArrowRightToLine className="h-4 w-4" />
          </Button>
        </div>
      </div>
  )
}

export default PaginationHandler