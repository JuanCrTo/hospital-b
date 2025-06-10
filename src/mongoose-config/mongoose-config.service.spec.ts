import { Test, TestingModule } from '@nestjs/testing'
import { MongooseConfigService } from './mongoose-config.service'

describe('MongooseConfigService', () => {
  let provider: MongooseConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongooseConfigService]
    }).compile()

    provider = module.get<MongooseConfigService>(MongooseConfigService)
  })

  it('should be defined', () => {
    expect(provider).toBeDefined()
  })
})
