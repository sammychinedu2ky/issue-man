
# issue-man

[![mynodeflow](https://github.com/sammychinedu2ky/meflow/actions/workflows/main.yml/badge.svg)](https://github.com/sammychinedu2ky/meflow/actions/workflows/main.yml)


# GitHub Issues Management Action

This action warns users when adult content is posted

## Inputs

### `myToken`

**Required** Your GitHub Token.

### `key`

**Required** The Key of your Azure Computer Vision Resource.

### `endpoint`

**Required** The endpoint of your Azure Computer Vision Resource.


## Example usage
```
uses: sammychinedu2ky/issue-man@v1
with:
  myToken: '${{ secrets.GITHUB_TOKEN }}'
  key: '${{secrets.KEY}}'
  endpoint: '${{secrets.ENDPOINT}}'
```