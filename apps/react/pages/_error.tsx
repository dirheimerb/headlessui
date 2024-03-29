import ErrorPage from 'next/error'
import Head from 'next/head'
import Link from 'next/link'

import { ExamplesType, resolveAllExamples } from '../utils/resolve-all-examples'

export async function getStaticProps() {
  return {
    props: {
      examples: await resolveAllExamples('pages'),
    },
  }
}

export default function Page(props: { examples: false | ExamplesType[] }) {
  if (props.examples === false) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>Examples</title>
      </Head>

      <div className="container mx-auto my-24">
        <div className="prose">
          <h2>Examples</h2>
          <Examples examples={props.examples} />
        </div>
      </div>
    </>
  )
}

export function Examples(props: { examples: ExamplesType[] }) {
  return (
    <ul>
      {props.examples.map((example) => (
        <li key={example.path}>
          {example.children ? (
            <h3 className="text-xl capitalize">{example.name}</h3>
          ) : (
            <Link href={example.path} className="capitalize">
              {example.name}
            </Link>
          )}
          {example.children && <Examples examples={example.children} />}
        </li>
      ))}
    </ul>
  )
}
