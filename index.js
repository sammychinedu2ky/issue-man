const github = require('@actions/github');
const core = require('@actions/core');
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;
const myToken = core.getInput('myToken');
const key = core.getInput('key')
const endpoint = core.getInput('endpoint')
const octokit = github.getOctokit(myToken)
let context = github.context
const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': key }
    }),
    endpoint);


async function run() {
    let re = /https.*\.(jpeg|jpg|jpg|png|gif|bmp)/gm
    let comment;
    if (context.payload.comment) {
        comment = context.payload.comment.body
    }
    else {
        comment = context.payload.issue.body
    }
    if (re.test(comment)) {
        let links = comment.match(re)
        for (link of links) {
            const adult = (await computerVisionClient.analyzeImage(link, {
                visualFeatures: ['Adult']
            })).adult;
            if (adult.isGoryContent || adult.isAdultContent) {
                const data = await octokit.issues.createComment({
                    owner: context.issue.owner,
                    repo: context.issue.repo,
                    issue_number: context.issue.number,
                    body: `@${context.actor} Please delete this gory content \r\n![warn](https://user-images.githubusercontent.com/36219292/110226853-be033a00-7ef2-11eb-802e-c7f6007fe7af.png)\r\n`,
                });
                break;
            }
        }
    }
}

run().catch(core.setFailed);
