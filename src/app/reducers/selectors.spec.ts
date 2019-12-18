import * as fromSelectors from './index';
describe('selectors', () => {
  describe('counter selectors', () => {
    it('can get the counter branch', () => {
      const state: fromSelectors.Appstate = {
        books: null,
        counter: {
          current: 1,
          by: 2
        }
      };
      const result = fromSelectors._selectCounterBranch(state);
      expect(result).toEqual({
        current: 1,
        by: 2
      });
      // yawn. Not super valuable. But maybe you get paid by the hour.

    });

    it('can get current count', () => {


      expect(fromSelectors.selectCurrentCount.projector({ current: 52, by: 99 })).toBe(52);
    });

    it('can get counting by', () => {
      expect(fromSelectors.selectCountingBy.projector({ by: 99 })).toBe(99);
    });

    it('can get the next number', () => {
      expect(fromSelectors.selectNextNumber.projector(10, 5)).toBe(15);
    });

  });
});
