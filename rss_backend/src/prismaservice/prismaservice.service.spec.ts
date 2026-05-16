import { Test, TestingModule } from '@nestjs/testing';
import { PrismaserviceService } from './prismaservice.service';

describe('PrismaserviceService', () => {
  let service: PrismaserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaserviceService],
    }).compile();

    service = module.get<PrismaserviceService>(PrismaserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
