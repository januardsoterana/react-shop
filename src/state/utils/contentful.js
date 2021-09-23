export const doQuery = (queryQL) => {
    return new Promise((resolve, reject) => {
        window
            .fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_SPACE_ID}/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                },
                body: JSON.stringify({query: queryQL}),
            })
            .then((response) => response.json())
            .then(({data, errors}) => {
                if (errors) {
                    console.error(errors);
                }
                resolve(data);
            });
    });
}

export const extractIdsFromTopLevel = (data) => {
    const homeComponent = data?.items?.length > 0 ? data?.items[0] : {};
    const items = homeComponent.marketingComponentsCollection?.items || [];
    const ids = items.map(item => item.sys?.id || '');
    return ids.filter(id => id);
}

export const extractIdsFromSecondLevel = (data) => {
    const items = data?.marketingComponentsCollection?.items || [];
    const ids = items.map(item => item.sys?.id || '');
    return ids.filter(id => id);
}

export const parseJSONFormat = (data) => {
    const contents = data.json?.content || [];
    let description = [];
    contents.forEach(content => {
        if (content.nodeType === 'paragraph') {
            if (content.content[0].value) {
                description.push({
                    type: 'paragraph',
                    content: content.content[0].value
                });
            }
        } else if (content.nodeType === 'hr') {
            description.push({
                type: 'hr'
            });
        } else if (content.nodeType === 'unordered-list') {
            const listContents = content.content || [];
            let listData = {
                type: 'list',
                content: []
            };
            listContents.forEach(listContent => {
                if (listContent.nodeType === 'list-item') {
                    listData.content.push(listContent.content[0].content[0].value);
                }
            });
            description.push(listData);
        }
    });
    return description;
}

export const parsedJSON2Html = (data) => {
    let htmlString = '';
    for (let i = 0; i < data.length; i++) {
        if (data[i].type === 'paragraph') {
            htmlString += '<p>' + data[i].content + '</p>';
        }
    }
    return htmlString;
}

