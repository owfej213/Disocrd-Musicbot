import { sync } from 'glob';

export async function loadComponents(client) {
    const componentFiles = sync('./component/**/*.js');

    console.log('Loading components');

    for (const file of componentFiles) {
        const component = await import(`../${file}`);

        if (!component.data?.id)
            throw new Error(
                `The command at ${file} is missing a required "data.command" property.`,
            );

        if (typeof component.execute !== 'function')
            throw new Error(
                `The command at ${file} is missing a required "execute" function.`,
            );

        const id = component.data.id;
        client.components.set(id, component);
    }
}
