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
			className='transition duration-200 ease-out flex flex-col items-center justify-center min-h-35
			 bg-surface hover:bg-divider/5 border border-divider rounded-2xl
aria-[current=true]:border-primary
aria-[current=true]:ring-2 aria-[current=true]:ring-primary'>
			<Image src={`${imageBaseUrl}${id}.png`} width={64} height={64} alt={`${name} thumbnail`} loading='eager' />
			<p className='id'>#{id}</p>
			<p className='name'>{name}</p>
		</Link>
	);
}
