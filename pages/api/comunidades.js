import { SiteClient } from 'datocms-client';

export default async function makeRequest(request, response) {
    const client = new SiteClient(process.env.NEXT_DATOCMS_API_TOKEN);

    if(request.method === 'GET') {
        const items = await client.items.all({
            filter: {
                type: 'community',
            }
        });
    
        response.status = 200;
        response.json(items);
        return;
    }

    if(request.method === 'POST') {
        const community = await client.items.create({
            itemType: '967623',
            ...request.body,
        });
    
        response.status = 200;
        response.json(community);
        return;
    }
    
    response.status = 404;
    response.json(`Ops! Method ${request.method} not found`);
}
