import type { ContentNode } from '../types';

interface Props {
    nodes: ContentNode[];
}

export default function ContentRenderer({ nodes }: Props) {
    return (
        <>
            {nodes.map((node, i) => (
                <ContentNodeView key={i} node={node} />
            ))}
        </>
    );
}

function ContentNodeView({ node }: { node: ContentNode }) {
    switch (node.type) {
        case 'heading': {
            const level = node.level ?? 2;
            if (level === 1) return <h1>{node.text}</h1>;
            if (level === 3) return <h3>{node.text}</h3>;
            return <h2>{node.text}</h2>;
        }

        case 'paragraph':
            return (
                <p dangerouslySetInnerHTML={{ __html: node.text ?? '' }} />
            );

        case 'list':
            return (
                <ul>
                    {node.items?.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                </ul>
            );

        case 'callout':
            return (
                <div
                    className={`content-callout content-callout--${node.variant ?? 'note'}`}
                    dangerouslySetInnerHTML={{ __html: node.text ?? '' }}
                />
            );

        case 'codeSnippet':
            return (
                <pre className="content-code">
                    <code>{node.text}</code>
                </pre>
            );

        default:
            return null;
    }
}
