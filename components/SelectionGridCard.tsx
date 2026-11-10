import Image from "next/image";
import { imageBaseUrl } from "@/consts/index";
import Link from "next/link";

interface SelectionGridCardProps {
	id: number;
	name: string;
	href: string;
	isSelected: boolean;
}

export default function SelectionGridCard({ id, name, href, isSelected }: SelectionGridCardProps) {
	return (
		<Link
			aria-current={isSelected ? "true" : undefined}
			scroll={false}
			href={href}
			draggable={false}
			className='flex h-25 flex-col items-center justify-center gap-1.5 rounded-2xl border border-divider bg-card transition-colors duration-200 hover:bg-white focus-visible:outline-3 focus-visible:outline-primary aria-[current=true]:border-3 aria-[current=true]:border-primary aria-[current=true]:bg-white lg:h-35'>
			<Image src={`${imageBaseUrl}${id}.png`} width={48} height={48} alt='' draggable={false} className='lg:size-16' />
			<p className='w-full truncate px-1 text-center text-[9px] uppercase lg:text-[10px]'>{name}</p>
		</Link>
	);
}
