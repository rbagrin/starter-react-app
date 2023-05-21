import { Injectable, Logger } from '@nestjs/common';
import { AlphaVantageClientService } from '../alphavantage/alphavantage.service';

import {
  Ticker,
  TimeSeriesDailyAdjustedResponse,
  TimeSeriesMonthlyAdjustedResponse,
  TimeSeriesWeeklyAdjustedResponse,
} from './stock.interace';
import { StockRepository } from '../../repositories/stock.repository';
import { ClientSession } from 'mongoose';
import { CreateStockDto } from './dto/createStock.dto';
import { DarqubeClientService } from '../darqube/darqube.service';
import {
  DarqubeBalanceSheetResponse,
  DarqubeIncomeStatementResponse,
  DarqubeTickerMarketData,
} from '../darqube/darqube.interface';

@Injectable()
export class StockService {
  private logger = new Logger(StockService.name);

  constructor(
    private readonly stockRepository: StockRepository,
    private readonly alphaVantageClientService: AlphaVantageClientService,
    private readonly darqubeClientService: DarqubeClientService,
  ) {}

  async creatStock(createStockDto: CreateStockDto, session: ClientSession) {
    return await this.stockRepository.createStock(createStockDto, session);
  }

  public async getAllStocks(): Promise<any> {
    return this.stockRepository.getAllStocks();
  }
  public async getDailyTickerData(
    ticker: Ticker,
    startDate: number,
    endDate: number,
    interval: '1d',
  ): Promise<DarqubeTickerMarketData[]> {
    return this.darqubeClientService.getTicketMarketData(
      ticker,
      startDate,
      endDate,
      interval,
    );
  }

  public async getTickerIncomeStatement(
    ticker: Ticker,
  ): Promise<DarqubeIncomeStatementResponse> {
    return this.darqubeClientService.getTickerIncomeStatement(ticker);
  }

  public async getTickerBalanceSheet(
    ticker: Ticker,
  ): Promise<DarqubeBalanceSheetResponse> {
    return this.darqubeClientService.getTickerBalanceSheet(ticker);
  }

  public async getDailyAdjustedStockDataByTicker(
    ticker: string,
  ): Promise<TimeSeriesDailyAdjustedResponse> {
    return this.alphaVantageClientService.getTickerTimeSeriesDailyAdjustedData(
      ticker,
    );
  }

  public async getWeeklyAdjustedStockDataByTicker(
    ticker: string,
  ): Promise<TimeSeriesWeeklyAdjustedResponse> {
    return this.alphaVantageClientService.getTickerTimeSerieWeeklyAdjustedData(
      ticker,
    );
  }

  public async getMonthlyAdjustedStockDataByTicker(
    ticker: string,
  ): Promise<TimeSeriesMonthlyAdjustedResponse> {
    return this.alphaVantageClientService.getTickerTimeSerieMonthlyAdjustedData(
      ticker,
    );
  }

  public async getStockNewsaByTicker(
    ticker: string,
  ): Promise<TimeSeriesMonthlyAdjustedResponse> {
    return this.alphaVantageClientService.getTickerNews(ticker);
  }
}
