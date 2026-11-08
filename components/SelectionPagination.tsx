import { createHref } from "@/lib/utils/createHrefs";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "pixelarticons/react";

interface SelectionPaginationProps {
	page: number;
	totalPages: number;
	selectedId: number | null;
}

export default function SelectionPagination({ page, totalPages, selectedId }: SelectionPaginationProps) {
	return (
		<nav aria-label='Pagination' className='flex justify-center items-center gap-4'>
			{page > 1 ?
				<Link className='btn' href={createHref(page - 1, selectedId)} scroll={false}>
					<ChevronLeft /> Prev
				</Link>
			:	<span className='btn aria-disabled:opacity-50' aria-disabled='true'>
					<ChevronLeft /> Prev
				</span>
			}
			{page < totalPages ?
				<Link className='btn' href={createHref(page + 1, selectedId)} scroll={false}>
					Next <ChevronRight />
				</Link>
			:	<span className='btn aria-disabled:opacity-50' aria-disabled='true'>
					Next <ChevronRight />
				</span>
			}
		</nav>
	);
}
