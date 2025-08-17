import { Test, TestingModule } from '@nestjs/testing';
import { FeedsParserService } from './feeds-parser.service';

describe('FeedsParserService', () => {
  let service: FeedsParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedsParserService],
    }).compile();

    service = module.get<FeedsParserService>(FeedsParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
