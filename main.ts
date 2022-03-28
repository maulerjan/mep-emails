import {XMLParser} from 'fast-xml-parser'
import {Parser} from 'json2csv'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

const listUrl = 'https://www.europarl.europa.eu/meps/en/full-list/xml'
const profileUrlPrefix = 'https://www.europarl.europa.eu/meps/en/'
const outputFileName = 'output.csv'
const xmlParser = new XMLParser()

async function run() {
    const result = await fetch(listUrl)
    const body = await result.text()
    const xml = xmlParser.parse(body)
    const members = xml?.meps?.mep as Array<any>

    if (!members) {
        console.log('No MEP list found.')
        return
    }

    const list = []

    for (let i = 0; i < 2; i++) {
        await new Promise<void>(resolve => setTimeout(resolve, 300))

        const member = members[i]
        let html: string

        try {
            const result = await fetch(profileUrlPrefix + member.id)
            html = await result.text()
        } catch(e) {
            await new Promise<void>(resolve => setTimeout(resolve, 1000))

            i = i - 1
            continue
        }

        const dom = cheerio.load(html)

        const email = dom('a.link_email').attr('href').slice(7).replace(/\[dot]/, '.').replace(/\[at]/, '@')
        const website = dom('a.link_website')?.attr('href')
        const instagram = dom('a.link_instagram')?.attr('href')
        const facebook = dom('a.link_fb')?.attr('href')
        const twitter = dom('a.link_twitt')?.attr('href')

        list.push({
            'Full name': member.fullName,
            'Country': member.country,
            'Political group': member.politicalGroup,
            'National political group': member.nationalPoliticalGroup,
            'E-mail': email.split('').reverse().join(''),
            'Website': website,
            'Instagram': instagram,
            'Facebook': facebook,
            'Twitter': twitter,
        })

        console.log('MEP information extracted. List length:', list.length)
    }

    const parser = new Parser({fields: Object.keys(list[0])})
    const csv = parser.parse(list)

    fs.writeFileSync(path.resolve(path.join(process.cwd(), outputFileName)), csv, {
        encoding: 'utf-8'
    })
}

run().catch(error => {
    console.error('An error occured during execution:')
    console.error(error)
})