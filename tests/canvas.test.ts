import { Color } from '~canvas'

describe('Color', () => {
  test('toText', () => {
    expect(new Color(1, 2, 3).toText()).toEqual('(1, 2, 3)')
    expect(new Color(-37, 2.557, 1e5).toText()).toEqual('(-37, 2.557, 100000)')
  })
})
