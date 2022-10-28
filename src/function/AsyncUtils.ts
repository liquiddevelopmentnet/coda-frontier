/*
 * Copyright github.com/liquiddevelopmentnet, 2022.
 * All rights reserved. Do not distribute without permission.
 */

export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
