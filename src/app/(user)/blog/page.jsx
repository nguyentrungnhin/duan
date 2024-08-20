import Link from "next/link"
export default function blog() {
    return (
        <>
            <h1>Bài viết mới</h1>
            <ul>
                <li>
                    <Link href="/blog/1">Bài viết 1</Link>
                </li>
                <li>
                    <Link href="/blog/2">Bài viết 2</Link>
                </li>
                <li>
                    <Link href="/blog/3">Bài viết 3</Link>
                </li>
                <li>
                    <Link href="/blog/4">Bài viết 4</Link>
                </li>
                <li>
                    <Link href="/blog/5">Bài viết 5</Link>
                </li>
            </ul>
        </>
    )
}