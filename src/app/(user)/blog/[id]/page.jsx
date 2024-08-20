export async function generateMetadata({ params, searchParams }, parent) {
    const id = params.id
    const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`).then((res) => res.json())
    return {
        title: post.title,
    }
}
export default async function Blogdetail({ params }) {
    const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`).then((res) => res.json())
    return (
        <>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </>
    )
}