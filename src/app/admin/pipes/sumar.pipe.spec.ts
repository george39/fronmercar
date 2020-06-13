import { SumarPipe } from './sumar.pipe';

describe('SumarPipe', () => {
  it('create an instance', () => {
    const pipe = new SumarPipe();
    expect(pipe).toBeTruthy();
  });
});
