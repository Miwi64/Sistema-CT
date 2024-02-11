import { PaginationData } from '@/components/pagination-handler';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TabsContent } from '@/components/ui/tabs';
import { ArrowLeftToLine, ArrowRightToLine, ChevronLeft, ChevronRight} from 'lucide-react';

interface PageTabProps {
    paginationData: PaginationData;
    setPaginationData: React.Dispatch<React.SetStateAction<PaginationData>>;
}

const PageTab = ({paginationData, setPaginationData}: PageTabProps) => {
    const { current_page, page_size, total_pages, next, previous } = paginationData;
    return (
        <TabsContent className="mt-0" value="Pagina">
            <div
                className="rounded-t-none rounded-b-lg overflow-x-auto flex flex-row items-center gap-4 
                rounded-md px-4 py-3 border bg-card text-card-foreground shadow-md"
            >
                <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Filas</p>
                        <Select
                            value={`${page_size}`}
                            onValueChange={(value) => {
                                setPaginationData({
                                    ...paginationData,
                                    page_size: Number(value),
                                    current_page: "1",
                                });
                            }}
                        >
                            <SelectTrigger className="h-8 w-[80px]">
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
                </div>
                <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Página</p>
                        <Select
                            value={`${current_page}`}
                            onValueChange={(value) => {
                                setPaginationData({ ...paginationData, current_page: value });
                            }}
                        >
                            <SelectTrigger className="h-8 w-[80px]">
                                <SelectValue
                                    placeholder={
                                        current_page === "last"
                                            ? `${total_pages}`
                                            : `${current_page}`
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {Array.from(
                                    { length: total_pages },
                                    (_, index) => index + 1
                                ).map((page) => (
                                    <SelectItem key={page} value={`${page}`}>
                                        {page}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        onClick={() => setPaginationData({ ...paginationData, current_page: "1" })}
                        disabled={!previous}
                    >
                        <ArrowLeftToLine className="sm:mr-2 h-5 w-5" />
                        <span className="hidden sm:block">Primera</span>
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() =>
                            setPaginationData({
                                ...paginationData,
                                current_page: `${Number(current_page) - 1}`,
                            })
                        }
                        disabled={!previous}
                    >
                        <ChevronLeft className="sm:mr-2 h-5 w-5" />
                        <span className="hidden sm:block">Anterior</span>
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() =>
                            setPaginationData({
                                ...paginationData,
                                current_page: `${Number(current_page) + 1}`,
                            })
                        }
                        disabled={!next}
                    >
                        <ChevronRight className="sm:mr-2 h-5 w-5" />
                        <span className="hidden sm:block">Siguiente</span>
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setPaginationData({ ...paginationData, current_page: "last" })}
                        disabled={!next}
                    >
                        <ArrowRightToLine className="sm:mr-2 h-5 w-5" />
                        <span className="hidden sm:block">Última</span>
                    </Button>
                </div>
            </div>
        </TabsContent>
    )
}

export default PageTab