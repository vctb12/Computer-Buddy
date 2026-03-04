import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CompatibilityModule } from './compatibility/compatibility.module';
import { PaymentsModule } from './payments/payments.module';
import { DigitalKeysModule } from './digital-keys/digital-keys.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production', // Never use in production
      logging: process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    CompatibilityModule,
    PaymentsModule,
    DigitalKeysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}